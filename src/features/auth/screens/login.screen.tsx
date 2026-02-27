import React, { useCallback } from 'react'
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'

import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-redux'
import { useFormFields } from '@/shared/hooks/use-form-fields'
import { useAsyncHandler } from '@/shared/hooks/use-async-handler'
import { loginAsync, clearError } from '@/redux/slices/auth.slice'
import { loginSchema } from '@/shared/schemas/auth.schema'
import { InputField } from '@/shared/components/input-field'
import { Button } from '@/shared/components/button'
import { loginStyles as styles } from './login.styles'

export function LoginScreen() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.auth.loading)
  const { values, errors, setField, setErrors } = useFormFields({ username: '', password: '' })
  const { handleError } = useAsyncHandler()
  const isValid = loginSchema.safeParse(values).success

  const validate = useCallback(() => {
    const result = loginSchema.safeParse(values)
    if (result.success) {
      setErrors({})
      return true
    }
    const fieldErrors: Record<string, string> = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string
      if (!fieldErrors[field]) fieldErrors[field] = issue.message
    }
    setErrors(fieldErrors)
    return false
  }, [values, setErrors])

  const handleSubmit = useCallback(async () => {
    if (!validate()) return
    dispatch(clearError())
    const payload = {
      username: values.username.trim(),
      password: values.password.trim(),
    }
    const result = await dispatch(loginAsync(payload))
    if (loginAsync.rejected.match(result)) {
      handleError(result.payload as string, 'Login failed. Please try again.')
    }
  }, [validate, dispatch, values, handleError])

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <Image
              source={{
                uri: 'https://plus.unsplash.com/premium_photo-1750860243675-ea2cf4a1c82b?q=80&w=800&h=600&auto=format&fit=crop',
              }}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
            <View style={styles.overlay} />
            <View style={styles.brandContainer}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoText}>People Made</Text>
              </View>
              <Text style={styles.tagline}>Creative Tools</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.subtitleText}>
              Sign in to continue exploring
            </Text>

            <InputField
              variant="username"
              value={values.username}
              onChangeText={setField('username')}
              error={errors.username}
            />

            <InputField
              variant="password"
              value={values.password}
              onChangeText={setField('password')}
              error={errors.password}
            />

            <Button
              label="Login"
              loading={loading}
              disabled={!isValid}
              onPress={handleSubmit}
              style={styles.submitButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
