from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from backend.apps.workouts import views

router = routers.DefaultRouter()
router.register(r'workouts', views.WorkoutsView, 'workout')
router.register(r'workouts_data', views.WorkoutsDataView, 'workout_data')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]