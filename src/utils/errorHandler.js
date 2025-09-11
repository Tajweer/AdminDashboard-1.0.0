/**
 * Comprehensive error handling utilities for the Admin Dashboard
 * Supports both Arabic and English error messages
 */

// Error message mappings for Arabic and English
const ERROR_MESSAGES = {
  // Authentication & Authorization Errors
  AUTH_001: {
    en: "Authentication token is required",
    ar: "رمز المصادقة مطلوب"
  },
  AUTH_002: {
    en: "Invalid authentication token",
    ar: "رمز المصادقة غير صحيح"
  },
  AUTH_003: {
    en: "Authentication token has expired",
    ar: "انتهت صلاحية رمز المصادقة"
  },
  AUTH_004: {
    en: "Invalid credentials provided",
    ar: "بيانات الاعتماد غير صحيحة"
  },
  AUTH_005: {
    en: "User not found",
    ar: "المستخدم غير موجود"
  },
  AUTH_006: {
    en: "User already exists",
    ar: "المستخدم موجود بالفعل"
  },
  AUTH_007: {
    en: "Access denied",
    ar: "تم رفض الوصول"
  },
  AUTH_008: {
    en: "Insufficient permissions",
    ar: "صلاحيات غير كافية"
  },
  AUTH_009: {
    en: "Account is locked",
    ar: "الحساب مقفل"
  },
  AUTH_010: {
    en: "Account is disabled",
    ar: "الحساب معطل"
  },

  // OTP & Verification Errors
  OTP_001: {
    en: "Invalid OTP code",
    ar: "رمز التحقق غير صحيح"
  },
  OTP_002: {
    en: "OTP code has expired",
    ar: "انتهت صلاحية رمز التحقق"
  },
  OTP_003: {
    en: "OTP code has already been used",
    ar: "تم استخدام رمز التحقق بالفعل"
  },
  OTP_004: {
    en: "Too many OTP attempts. Please try again later",
    ar: "محاولات كثيرة لرمز التحقق. يرجى المحاولة لاحقاً"
  },
  OTP_005: {
    en: "Failed to send OTP code",
    ar: "فشل في إرسال رمز التحقق"
  },
  OTP_006: {
    en: "OTP resend limit exceeded",
    ar: "تم تجاوز حد إعادة إرسال رمز التحقق"
  },

  // Validation Errors
  VAL_001: {
    en: "This field is required",
    ar: "هذا الحقل مطلوب"
  },
  VAL_002: {
    en: "Invalid format",
    ar: "تنسيق غير صحيح"
  },
  VAL_003: {
    en: "Invalid phone number format",
    ar: "تنسيق رقم الهاتف غير صحيح"
  },
  VAL_004: {
    en: "Invalid email format",
    ar: "تنسيق البريد الإلكتروني غير صحيح"
  },
  VAL_005: {
    en: "Invalid price value",
    ar: "قيمة السعر غير صحيحة"
  },
  VAL_006: {
    en: "Invalid date format",
    ar: "تنسيق التاريخ غير صحيح"
  },
  VAL_007: {
    en: "Text is too short",
    ar: "النص قصير جداً"
  },
  VAL_008: {
    en: "Text is too long",
    ar: "النص طويل جداً"
  },
  VAL_009: {
    en: "Number is too small",
    ar: "الرقم صغير جداً"
  },
  VAL_010: {
    en: "Number is too large",
    ar: "الرقم كبير جداً"
  },
  VAL_011: {
    en: "Invalid file type",
    ar: "نوع الملف غير صحيح"
  },
  VAL_012: {
    en: "File size is too large",
    ar: "حجم الملف كبير جداً"
  },

  // User Management Errors
  USER_001: {
    en: "User not found",
    ar: "المستخدم غير موجود"
  },
  USER_002: {
    en: "User already exists",
    ar: "المستخدم موجود بالفعل"
  },
  USER_003: {
    en: "User profile is incomplete",
    ar: "الملف الشخصي غير مكتمل"
  },
  USER_004: {
    en: "Phone number is already registered",
    ar: "رقم الهاتف مسجل بالفعل"
  },
  USER_005: {
    en: "Email is already registered",
    ar: "البريد الإلكتروني مسجل بالفعل"
  },
  USER_006: {
    en: "User account is suspended",
    ar: "حساب المستخدم معلق"
  },

  // Product Management Errors
  PROD_001: {
    en: "Product not found",
    ar: "المنتج غير موجود"
  },
  PROD_002: {
    en: "Product already exists",
    ar: "المنتج موجود بالفعل"
  },
  PROD_003: {
    en: "Product is out of stock",
    ar: "المنتج غير متوفر"
  },
  PROD_004: {
    en: "Product is inactive",
    ar: "المنتج غير نشط"
  },
  PROD_005: {
    en: "Failed to upload product image",
    ar: "فشل في رفع صورة المنتج"
  },
  PROD_006: {
    en: "Invalid product category",
    ar: "فئة المنتج غير صحيحة"
  },
  PROD_007: {
    en: "Invalid product price",
    ar: "سعر المنتج غير صحيح"
  },
  PROD_008: {
    en: "Failed to delete product",
    ar: "فشل في حذف المنتج"
  },
  PROD_009: {
    en: "Minimum price must be equal to or less than initial price",
    ar: "يجب أن يكون السعر الأدنى مساوياً أو أقل من السعر الأولي"
  },

  // Order Management Errors
  ORDER_001: {
    en: "Order not found",
    ar: "الطلب غير موجود"
  },
  ORDER_002: {
    en: "Order has already been processed",
    ar: "تم معالجة الطلب بالفعل"
  },
  ORDER_003: {
    en: "Failed to cancel order",
    ar: "فشل في إلغاء الطلب"
  },
  ORDER_004: {
    en: "Payment processing failed",
    ar: "فشل في معالجة الدفع"
  },
  ORDER_005: {
    en: "Insufficient stock for order",
    ar: "المخزون غير كافي للطلب"
  },
  ORDER_006: {
    en: "Invalid order status",
    ar: "حالة الطلب غير صحيحة"
  },
  ORDER_007: {
    en: "Order delivery failed",
    ar: "فشل في تسليم الطلب"
  },

  // System & Infrastructure Errors
  SYS_001: {
    en: "Database connection error",
    ar: "خطأ في الاتصال بقاعدة البيانات"
  },
  SYS_002: {
    en: "Network connection error",
    ar: "خطأ في الاتصال بالشبكة"
  },
  SYS_003: {
    en: "Service is temporarily unavailable",
    ar: "الخدمة غير متاحة مؤقتاً"
  },
  SYS_004: {
    en: "System is under maintenance",
    ar: "النظام تحت الصيانة"
  },
  SYS_005: {
    en: "Rate limit exceeded. Please try again later",
    ar: "تم تجاوز حد الطلبات. يرجى المحاولة لاحقاً"
  },
  SYS_006: {
    en: "Storage is full",
    ar: "التخزين ممتلئ"
  },
  SYS_007: {
    en: "System configuration error",
    ar: "خطأ في إعدادات النظام"
  },
  SYS_008: {
    en: "External service error",
    ar: "خطأ في الخدمة الخارجية"
  },

  // Generic Errors
  GEN_001: {
    en: "An unknown error occurred",
    ar: "حدث خطأ غير معروف"
  },
  GEN_002: {
    en: "Internal server error",
    ar: "خطأ داخلي في الخادم"
  },
  GEN_003: {
    en: "Bad request",
    ar: "طلب غير صحيح"
  },
  GEN_004: {
    en: "Resource not found",
    ar: "المورد غير موجود"
  },
  GEN_005: {
    en: "Resource conflict",
    ar: "تعارض في المورد"
  },
  GEN_006: {
    en: "Request timeout",
    ar: "انتهت مهلة الطلب"
  },
  GEN_007: {
    en: "Access forbidden",
    ar: "الوصول محظور"
  },
  GEN_008: {
    en: "Unauthorized access",
    ar: "وصول غير مصرح به"
  }
};

// Get current language preference
function getCurrentLanguage() {
  const savedLanguage = localStorage.getItem('language');
  return savedLanguage || 'en';
}

// Get localized error message
function getLocalizedErrorMessage(errorCode, language = null) {
  const lang = language || getCurrentLanguage();
  const error = ERROR_MESSAGES[errorCode];
  
  if (!error) {
    return ERROR_MESSAGES.GEN_001[lang];
  }
  
  return error[lang] || error.en;
}

// Extract error code from error response
function extractErrorCode(error) {
  if (error?.response?.data?.error?.code) {
    return error.response.data.error.code;
  }
  
  if (error?.response?.data?.code) {
    return error.response.data.code;
  }
  
  // Map HTTP status codes to error codes
  const statusCode = error?.response?.status;
  if (statusCode) {
    const statusToErrorCode = {
      400: 'GEN_003',
      401: 'AUTH_002',
      403: 'AUTH_007',
      404: 'GEN_004',
      408: 'GEN_006',
      409: 'GEN_005',
      429: 'SYS_005',
      500: 'GEN_002',
      502: 'SYS_008',
      503: 'SYS_003',
      507: 'SYS_006'
    };
    
    return statusToErrorCode[statusCode] || 'GEN_001';
  }
  
  return 'GEN_001';
}

// Main error handler function
export function handleError(error, customMessage = null, language = null) {
  console.error('Error occurred:', error);
  
  // If custom message is provided, use it
  if (customMessage) {
    return customMessage;
  }
  
  // Extract error code and get localized message
  const errorCode = extractErrorCode(error);
  const message = getLocalizedErrorMessage(errorCode, language);
  
  return message;
}

// Specific error handlers
export function handleAuthError(error, language = null) {
  const errorCode = extractErrorCode(error);
  return getLocalizedErrorMessage(errorCode, language);
}

export function handleValidationError(error, language = null) {
  const errorCode = extractErrorCode(error);
  return getLocalizedErrorMessage(errorCode, language);
}

export function handleNetworkError(error, language = null) {
  const errorCode = extractErrorCode(error);
  return getLocalizedErrorMessage(errorCode, language);
}

export function handleSystemError(error, language = null) {
  const errorCode = extractErrorCode(error);
  return getLocalizedErrorMessage(errorCode, language);
}

// Validation utilities
export function validatePhoneNumber(phone) {
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid Saudi mobile number
  if (cleanPhone.length === 9 && cleanPhone.startsWith('5')) {
    return true;
  }
  
  // Check if it's a valid Saudi number with country code
  if (cleanPhone.length === 12 && cleanPhone.startsWith('9665')) {
    return true;
  }
  
  return false;
}

export function validateOTP(otp) {
  return /^\d{4,6}$/.test(otp);
}

export function validatePrice(price) {
  return typeof price === 'number' && price > 0;
}

export function validatePriceComparison(initialPrice, minimumPrice) {
  if (typeof initialPrice !== 'number' || typeof minimumPrice !== 'number') {
    return { isValid: false, errorCode: 'PROD_007' };
  }
  
  if (minimumPrice > initialPrice) {
    return { isValid: false, errorCode: 'PROD_009' };
  }
  
  return { isValid: true };
}

export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return false;
  }
  
  // Name should be 2-50 characters, allow Arabic and English letters, spaces, and common punctuation
  const nameRegex = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z\s\.\-\']{2,50}$/;
  return nameRegex.test(name.trim());
}

// Show error notification
export function showErrorNotification(message, duration = 5000) {
  // This would integrate with your notification system
  // For now, using alert as fallback
  alert(message);
}

// Show success notification
export function showSuccessNotification(message, duration = 3000) {
  // This would integrate with your notification system
  // For now, using alert as fallback
  alert(message);
}

// API error interceptor for axios
export function setupErrorInterceptor(axiosInstance) {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Don't show error notifications for expected 404s in auction checks
      const isAuctionCheck = error.config?.url?.includes('/auctions/product/');
      const isExpected404 = error.response?.status === 404 && isAuctionCheck;
      
      if (!isExpected404) {
        const message = handleError(error);
        showErrorNotification(message);
      }
      
      return Promise.reject(error);
    }
  );
}

export default {
  handleError,
  handleAuthError,
  handleValidationError,
  handleNetworkError,
  handleSystemError,
  validatePhoneNumber,
  validateOTP,
  validatePrice,
  validatePriceComparison,
  validateName,
  showErrorNotification,
  showSuccessNotification,
  setupErrorInterceptor,
  getLocalizedErrorMessage,
  getCurrentLanguage
};
