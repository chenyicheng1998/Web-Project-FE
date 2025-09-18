const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

// Google OAuth 成功回调处理
const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/#/login?error=google_auth_failed`);
    }

    const { id, displayName, emails, photos } = req.user;
    const email = emails[0].value;
    const avatar = photos[0]?.value || null;

    // 查找或创建用户
    let user = await User.findOne({ googleId: id });

    if (!user) {
      // 检查邮箱是否已被其他用户使用
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // 如果邮箱已存在但不是Google用户，更新为Google用户
        if (existingUser.provider === 'local') {
          existingUser.googleId = id;
          existingUser.provider = 'google';
          existingUser.avatar = avatar;
          await existingUser.save();
          user = existingUser;
        } else {
          return res.redirect(`${process.env.FRONTEND_URL}/#/login?error=email_already_exists`);
        }
      } else {
        // 创建新的Google用户
        user = new User({
          username: displayName || email.split('@')[0],
          email,
          googleId: id,
          provider: 'google',
          avatar,
          isEmailVerified: true // Google邮箱默认已验证
        });
        await user.save();
      }
    } else {
      // 更新用户信息
      user.avatar = avatar;
      await user.save();
    }

    // 生成JWT token
    const token = generateToken(user._id);

    // 更新最后登录时间
    await user.updateLastLogin();

    // 重定向到前端，携带token
    res.redirect(`${process.env.FRONTEND_URL}/#/login?token=${token}&success=google_login`);

  } catch (error) {
    console.error('Google callback error:', error);
    // 修复：错误情况下不使用未定义的token变量
    res.redirect(`${process.env.FRONTEND_URL}/#/login?error=google_auth_failed`);
  }
};

// 验证Google token（用于前端验证）
const verifyGoogleToken = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        valid: false,
        message: 'No token provided'
      });
    }

    // 验证JWT token
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 查找用户
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({
        valid: false,
        message: 'User not found'
      });
    }

    res.json({
      valid: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        provider: user.provider,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Google token verification error:', error);
    res.status(401).json({
      valid: false,
      message: 'Invalid token'
    });
  }
};

module.exports = {
  googleCallback,
  verifyGoogleToken
};

