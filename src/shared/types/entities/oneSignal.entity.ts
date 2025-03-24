export interface OneSignalSubscription {
  id: string;
  app_id: string;
  type: string;
  token: string;
  enabled: boolean;
  notification_types: number;
  session_time: number;
  session_count: number;
  sdk: string;
  device_model: string;
  device_os: string;
  rooted: boolean;
  test_type: number;
  app_version: string;
  net_type: number;
  carrier: string;
  web_auth: string;
  web_p256: string;
}
export interface OneSignalTag {
  [key: string]: string;
}
export interface OneSignalUserResult {
  properties: {
    tags: OneSignalTag[];
    language: string;
    timezone_id: string;
    country: string;
    first_active: number;
    last_active: number;
    ip: string;
  };
  identity: {
    external_id: string;
    onesignal_id: string;
  };
  subscriptions: OneSignalSubscription[];
}
export interface OneSignalOutcomeResult {
  id: string;
  app_id: string;
  outcome_names: {
    [key: string]: {
      [attribution: string]: number;
    };
  };
}
export interface OneSignalMessageResult {
  adm_big_picture: null;
  adm_group: null;
  adm_group_message: null;
  adm_large_icon: null;
  adm_small_icon: null;
  adm_sound: null;
  spoken_text: null;
  alexa_ssml: null;
  alexa_display_title: null;
  amazon_background_data: null;
  android_accent_color: null;
  android_group: null;
  android_group_message: null;
  android_led_color: null;
  android_sound: null;
  android_visibility: null;
  app_id: string;
  big_picture: null;
  buttons: null;
  canceled: boolean;
  chrome_big_picture: null;
  chrome_icon: null;
  chrome_web_icon: null;
  chrome_web_image: null;
  chrome_web_badge: null;
  content_available: null;
  contents: {
    en: string;
  };
  converted: number;
  data: null;
  delayed_option: null;
  delivery_time_of_day: null;
  errored: number;
  excluded_segments: [];
  failed: number;
  firefox_icon: null;
  global_image: null;
  headings: {
    en: string;
  };
  id: string;
  include_player_ids: null;
  include_external_user_ids: null;
  include_aliases: {
    external_id: string[];
  };
  included_segments: [];
  thread_id: null;
  ios_badgeCount: null;
  ios_badgeType: null;
  ios_category: null;
  ios_interruption_level: null;
  ios_relevance_score: null;
  ios_sound: null;
  apns_alert: null;
  target_content_identifier: null;
  isAdm: boolean;
  isAndroid: boolean;
  isChrome: boolean;
  isChromeWeb: boolean;
  isAlexa: boolean;
  isFirefox: boolean;
  isIos: boolean;
  isSafari: boolean;
  isWP: boolean;
  isWP_WNS: boolean;
  isEdge: boolean;
  isHuawei: boolean;
  isSMS: boolean;
  large_icon: null;
  priority: null;
  queued_at: number;
  remaining: number;
  send_after: number;
  completed_at: number;
  small_icon: null;
  successful: number;
  received: number;
  tags: OneSignalTag[];
  filters: null;
  template_id: null;
  ttl: number;
  url: null;
  web_url: null;
  app_url: null;
  web_buttons: null;
  web_push_topic: null;
  wp_sound: null;
  wp_wns_sound: null;
  platform_delivery_stats: {
    [key: string]: {
      successful: number;
      converted: number;
      received: number;
      failed: number;
      errored: number;
    };
  };
  ios_attachments: null;
  huawei_sound: null;
  huawei_led_color: null;
  huawei_accent_color: null;
  huawei_visibility: null;
  huawei_group: null;
  huawei_group_message: null;
  huawei_channel_id: null;
  huawei_existing_channel_id: null;
  huawei_small_icon: null;
  huawei_large_icon: null;
  huawei_big_picture: null;
  huawei_msg_type: null;
  throttle_rate_per_minute: null;
  fcap_group_ids: null;
  fcap_status: "uncapped";
  sms_from: null;
  sms_media_urls: null;
  subtitle: null;
  name: null;
  email_click_tracking_disabled: null;
  isEmail: false;
  email_subject: null;
  email_from_name: null;
  email_from_address: null;
  email_preheader: null;
  email_reply_to_address: null;
  include_unsubscribed: false;
  huawei_category: null;
  huawei_bi_tag: null;
}
