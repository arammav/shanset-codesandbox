// src/App.js
import { useState, useEffect } from "react";
import { Home, Gift, User, HelpCircle } from "lucide-react";

function getRemainingTime() {
  const now = new Date();
  const tomorrowNoon = new Date();
  tomorrowNoon.setDate(now.getDate() + 1);
  tomorrowNoon.setHours(12, 0, 0, 0);
  const diff = tomorrowNoon - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${hours}س ${minutes}د ${seconds}ث`;
}

export default function ShanestApp() {
  const MAX_DAILY_ADS = 5;

  const [credits, setCredits] = useState(0);
  const [watchedAds, setWatchedAds] = useState(0);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [page, setPage] = useState("home");

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWatchAd = () => {
    if (watchedAds >= MAX_DAILY_ADS) return;
    setIsAdPlaying(true);
    setTimeout(() => {
      setCredits((prev) => prev + 1);
      setWatchedAds((prev) => prev + 1);
      setIsAdPlaying(false);
    }, 3000);
  };

  const remainingAds = MAX_DAILY_ADS - watchedAds;

  const renderHome = () => (
    <div className="content">
      <h1>🎉 اپلیکیشن شانست</h1>
      <p>
        ⏳ فرصت باقی‌مانده تا ریست تیکت‌ها: <strong>{remainingTime}</strong>
      </p>
      <p>
        🎬 تبلیغات باقی‌مانده امروز: <strong>{remainingAds}</strong>
      </p>

      <div className="card">
        <div className="card-content">
          <p>
            🎟️ کردیت‌های شما: <strong>{credits}</strong>
          </p>
          <p className="muted">تبلیغات دیده‌شده: {watchedAds}</p>

          <button
            onClick={handleWatchAd}
            disabled={isAdPlaying || watchedAds >= MAX_DAILY_ADS}
            className="btn"
          >
            {isAdPlaying
              ? "در حال نمایش تبلیغ..."
              : watchedAds >= MAX_DAILY_ADS
              ? "سقف تبلیغات امروز پر شده"
              : "دیدن تبلیغ و گرفتن تیکت"}
          </button>

          <p className="muted mt-3">تیکت‌های امروز: {credits}</p>
          <ul className="tickets-list">
            {[...Array(credits)].map((_, idx) => (
              <li key={idx}>
                🎫 TKT-{idx + 1}-
                {Math.random().toString(36).substring(2, 8).toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderRewards = () => (
    <div className="content">
      <h2>🎁 جوایز روزانه و هفتگی</h2>
      <ul className="muted-list">
        <li>هر روز: گیفت کارت 10 دلاری (اپل / پلی‌استیشن / اسپاتیفای)</li>
        <li>جمعه‌ها: ایرپاد اورجینال</li>
        <li>آخر ماه: اپل واچ برای یک برنده خوش‌شانس</li>
      </ul>
    </div>
  );

  const renderFairness = () => (
    <div className="content">
      <h2>🔍 شفافیت قرعه‌کشی</h2>
      <p className="muted-text">
        تمام تیکت‌ها با الگوریتم تصادفی انتخاب می‌شوند. هر تیکت یک کد یکتا دارد
        و برنده از بین آن‌ها به صورت خودکار انتخاب می‌شود. روند قرعه‌کشی قابل
        بررسی و بازبینی است.
      </p>
    </div>
  );

  const renderProfile = () => (
    <div className="content">
      <h2>👤 پروفایل شما</h2>
      <p className="muted-text">
        در آینده قابلیت ویرایش اطلاعات کاربری اضافه خواهد شد.
      </p>
    </div>
  );

  const renderContact = () => (
    <div className="content">
      <h2>📢 ارتباط با ما</h2>
      <p className="muted-text">
        برای تبلیغات یا همکاری با ما تماس بگیرید: support@shanest.app
      </p>
    </div>
  );

  return (
    <div className="app-container">
      <div className="page-content">
        {page === "home" && renderHome()}
        {page === "rewards" && renderRewards()}
        {page === "fairness" && renderFairness()}
        {page === "profile" && renderProfile()}
        {page === "contact" && renderContact()}
      </div>

      <nav className="bottom-nav">
        <button onClick={() => setPage("profile")} className="nav-btn">
          <User size={20} /> پروفایل
        </button>
        <button onClick={() => setPage("rewards")} className="nav-btn">
          <Gift size={20} /> جوایز
        </button>
        <button onClick={() => setPage("home")} className="nav-btn center-btn">
          🎟️ تیکت
        </button>
        <button onClick={() => setPage("fairness")} className="nav-btn">
          <HelpCircle size={20} /> شفافیت
        </button>
        <button onClick={() => setPage("contact")} className="nav-btn">
          📞 تماس
        </button>
      </nav>
    </div>
  );
}
