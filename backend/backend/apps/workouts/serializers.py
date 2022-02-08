from rest_framework import serializers
from .models import Workout, Exercise


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('id','title', 'area', 'tips', 'sets', 'reps', 'iso_hold', 'max', 'order_in_workout')


class WorkoutSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True)
    class Meta:
        model = Workout
        fields = ('id','title', 'areas', 'workout_type', 'exercises')

