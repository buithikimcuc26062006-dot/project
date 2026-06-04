import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function VerifyScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOtpChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)/home');
    }, 1500);
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Con Khỏe</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconWrapper}>
          <View style={styles.iconBlur} />
          <View style={styles.iconCircle}>
            <Mail size={48} color={Colors.primary} fill={Colors.primaryContainer} />
          </View>
        </View>

        {/* Text */}
        <View style={styles.textSection}>
          <Text style={styles.title}>Xác minh tài khoản</Text>
          <Text style={styles.subtitle}>
            Mã xác minh đã được gửi đến địa chỉ email Google của bạn
          </Text>
        </View>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
              value={digit}
              onChangeText={(val) => handleOtpChange(val, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.confirmButton, loading && styles.confirmButtonLoading]}
            activeOpacity={0.85}
            onPress={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.onPrimary} />
            ) : (
              <Text style={styles.confirmButtonText}>Xác nhận</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleResend} disabled={!canResend}>
            <Text style={[styles.resendText, !canResend && styles.resendTextDisabled]}>
              Gửi lại mã{' '}
              {!canResend && <Text style={styles.timerText}>({timeLeft}s)</Text>}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Trust */}
        <View style={styles.trustSection}>
          <ShieldCheck size={16} color={Colors.outline} />
          <Text style={styles.trustText}>Bảo mật bởi Google Cloud</Text>
        </View>
      </View>

      {/* Bottom decoration */}
      <View style={styles.bottomDecoration} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    position: 'sticky' as any,
    top: 0,
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
  },
  backButton: {
    padding: 8,
    borderRadius: 9999,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 32,
    maxWidth: 448,
    alignSelf: 'center',
    width: '100%',
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 24,
  },
  iconBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary + '1A',
    borderRadius: 9999,
  },
  iconCircle: {
    width: 96,
    height: 96,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 280,
    fontFamily: 'NunitoSans-Regular',
  },
  otpContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  otpInput: {
    width: 48,
    height: 56,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  otpInputFilled: {
    borderColor: Colors.primary,
  },
  actions: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  confirmButton: {
    width: '100%',
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  confirmButtonLoading: {
    opacity: 0.8,
  },
  confirmButtonText: {
    color: Colors.onPrimary,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
  },
  resendText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  resendTextDisabled: {
    color: Colors.onSurfaceVariant,
  },
  timerText: {
    color: Colors.onSurfaceVariant,
  },
  trustSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 'auto',
    paddingBottom: 40,
  },
  trustText: {
    fontSize: 12,
    color: Colors.outline,
    fontFamily: 'NunitoSans-SemiBold',
  },
  bottomDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 128,
    backgroundColor: Colors.secondaryContainer,
    opacity: 0.4,
    borderTopLeftRadius: 9999,
    borderTopRightRadius: 9999,
  },
});
