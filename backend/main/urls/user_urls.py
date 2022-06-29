from django.urls import path
from main.views import user_views as views

urlpatterns = [

    path('register/', views.registerUser, name='register'),

    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('profile/', views.getUserProfile, name='users-profile'),

    path('profile/update/', views.updateUserProfile, name='users-profile-update'),
    
    path('', views.getUsers, name='users'),
]