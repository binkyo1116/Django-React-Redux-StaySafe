from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('main.urls.product_urls')),
    path('api/users/', include('main.urls.user_urls')),
    path('api/orders/', include('main.urls.order_urls')),

]

urlpatterns += static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)