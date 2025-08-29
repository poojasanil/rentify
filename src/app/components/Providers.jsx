'use client'
import { Provider } from 'react-redux'
import { store } from '../../store'
import { AuthProvider } from '../../context/AuthContext'

// import '../../i18n/config';
// import { I18nextProvider } from 'react-i18next';
// import i18n from '../../i18n/config';

export default function Providers({ children }) {
  return (
    // <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
      </Provider>
    // </I18nextProvider>
  )
}
