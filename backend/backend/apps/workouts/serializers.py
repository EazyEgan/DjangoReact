from django.utils import timezone
from rest_framework import serializers
from .models import Workout, Exercise, Log


class LogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Log
        fields = ( 'exercise_id', 'sets', 'reps', 'max', 'date')

class ExerciseSerializer(serializers.ModelSerializer):
    # Logs not included with exercise data as standard
    class Meta:
        model = Exercise
        fields = ('id','title', 'area', 'tips', 'sets', 'reps', 'iso_hold', 'max', 'order_in_workout')


class WorkoutSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True)
    class Meta:
        model = Workout
        fields = ('id','title', 'areas', 'workout_type', 'exercises')
