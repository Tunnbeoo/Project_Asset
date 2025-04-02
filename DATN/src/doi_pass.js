import React, { useState } from "react";
import "./doi_pass.css"; 

const UpdatePassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const handleRequestToken = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3000/request-change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Lỗi gửi mã xác thực");

      setSuccess("Mã xác thực đã gửi tới email.");
      setIsEmailSent(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyToken = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3000/verify-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Mã xác thực không hợp lệ");

      setSuccess("Mã xác thực hợp lệ. Nhập mật khẩu mới.");
      setIsTokenValid(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Không thể đặt lại mật khẩu");

      setSuccess("Mật khẩu đặt lại thành công! Đăng nhập ngay.");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="update-password-page">
      <div className="update-password-container">
        <h2>Đặt lại mật khẩu</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isEmailSent}
          />
          <button onClick={handleRequestToken} disabled={loading || isEmailSent}>
            {loading ? "Đang gửi mã..." : "Gửi mã xác thực"}
          </button>
        </div>

        {isEmailSent && (
          <div className="form-group">
            <label>Mã xác thực (Token)</label>
            <input
              type="text"
              placeholder="Nhập mã xác nhận"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              disabled={isTokenValid}
            />
            <button onClick={handleVerifyToken} disabled={loading || isTokenValid}>
              {loading ? "Đang xác thực..." : "Xác nhận"}
            </button>
          </div>
        )}

        {isTokenValid && (
          <div className="form-group">
            <label>Mật khẩu mới</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button onClick={handleResetPassword} disabled={loading}>
              {loading ? "Đang đặt mật khẩu..." : "Đặt mật khẩu"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePassword;
