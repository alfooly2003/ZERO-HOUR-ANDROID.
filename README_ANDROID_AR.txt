ZERO HOUR – مشروع Android لتجهيزه كـ APK

هذا مشروع Android Studio يغلّف نسخة اللعبة الحالية داخل Android WebView بوضع أفقي.

طريقة البناء:
1) انقل مجلد ZERO_HOUR_ANDROID إلى كمبيوتر عليه Android Studio حديث و JDK 17.
2) افتح المجلد من Android Studio (Open).
3) انتظر Gradle Sync واكتمال تنزيل Android Gradle Plugin/SDK عند الطلب.
4) من القائمة: Build > Build Bundle(s) / APK(s) > Build APK(s).
5) ستجد ملف APK عادةً في:
   app/build/outputs/apk/debug/app-debug.apk
6) انقل APK إلى هاتف Android وثبّته. قد يطلب الهاتف السماح بالتثبيت من هذا المصدر.

ملاحظات:
- هذه حزمة مشروع بناء وليست APK جاهزًا؛ لم تتوفر في بيئة الإنشاء أدوات Android SDK/Gradle لتوقيع وبناء APK فعلي.
- اللعبة الحالية تعمل داخل WebView. لا يوجد ضمان أن كل عناصر اللمس/المقاسات خالية من الأخطاء قبل الاختبار على الهاتف.
- سيرفر اللعب الجماعي server.js ملف منفصل ويجب تشغيله على جهاز مضيف يدعم Node.js؛ لا يعمل تلقائيًا داخل التطبيق.
- الشبكة عبر Hotspot تحتاج تجربة فعلية على جهازين. هذا الغلاف لا يضيف مزامنة المراحل أو قتال PvP كامل.
