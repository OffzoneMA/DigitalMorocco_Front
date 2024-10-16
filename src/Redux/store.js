import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../Services/Auth'
import { adminApi } from '../Services/Admin.Service'
import authReducer from './auth/authSlice'
import { memberApi } from '../Services/Member.Service'
import { subsApi } from '../Services/Subscription.Service'
import { userLogApi } from '../Services/UserLog.Service'
import { subscriptionLogApi } from '../Services/SubscriptionLog.Service'
import { userApi } from '../Services/User.Service'
import { partnerApi } from '../Services/Partner.Service'
import { investorApi } from '../Services/Investor.Service'
import { projectApi } from '../Services/Project.Service'
import { eventApi } from '../Services/Event.Service'
import { documentApi } from '../Services/Document.Service'
import { subscriptionPlanApi } from '../Services/SubscriptionPlan.service'
import { paymentMethodApi } from '../Services/PaymentMethod.Service'
import { activityHistoryApi } from '../Services/Histoty.Service'
import { contactRequestApi } from '../Services/ContactRequest.Service'
import LogRocket from 'logrocket';
import { billingApi } from '../Services/Billing.Service';
import { notificationApi } from '../Services/Notification.Service';
import { sponsorApi } from '../Services/Sponsor.Service'


const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [memberApi.reducerPath]: memberApi.reducer,
    [subsApi.reducerPath]: subsApi.reducer,
    [userLogApi.reducerPath]: userLogApi.reducer,
    [subscriptionLogApi.reducerPath]: subscriptionLogApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [partnerApi.reducerPath]: partnerApi.reducer,
    [investorApi.reducerPath]: investorApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [subscriptionPlanApi.reducerPath]: subscriptionPlanApi.reducer,
    [paymentMethodApi.reducerPath]: paymentMethodApi.reducer,
    [activityHistoryApi.reducerPath]: activityHistoryApi.reducer,
    [contactRequestApi.reducerPath]: contactRequestApi.reducer,
    [billingApi.reducerPath]: billingApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [sponsorApi.reducerPath]: sponsorApi.reducer
  },
  devTools: process.env.NODE_ENV === 'development',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authApi.middleware, adminApi.middleware, memberApi.middleware,
         subsApi.middleware, userLogApi.middleware, subscriptionLogApi.middleware
        , userApi.middleware, partnerApi.middleware, investorApi.middleware , projectApi.middleware ,
        eventApi.middleware , LogRocket.reduxMiddleware() , documentApi.middleware ,
        subscriptionPlanApi.middleware , paymentMethodApi.middleware , activityHistoryApi.middleware,
        contactRequestApi.middleware , billingApi.middleware , notificationApi.middleware , sponsorApi.middleware
        ]) ,
})
export default store