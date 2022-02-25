from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from backend.apps.workouts import views

router = routers.DefaultRouter()
router.register(r'workouts', views.WorkoutsView, 'workout')
#router.register(r'exercise_logs', views.ExerciseLogView, 'exercise_log')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/exercise_logs/',views.logDataView),
    path('api/workout_log/',views.calendarDataView)
]