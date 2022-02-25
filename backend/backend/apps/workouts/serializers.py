from django.utils import timezone
from rest_framework import serializers
from .models import Workout, Exercise, Log, WorkoutCalendarLog

from rest_framework import serializers


class DynamicFieldsModelSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields:
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class LogSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Log
        fields = ('id','exercise', 'workout_calendar_log_id', 'sets', 'reps', 'max', 'date')


class WorkoutCalendarLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutCalendarLog
        fields = ('id',
                  'date',
                  'workout',
                  'logs',)


class ExerciseSerializer(serializers.ModelSerializer):
    # Logs not included with exercise data as standard
    class Meta:
        model = Exercise
        fields = (
        'id', 'title', 'area', 'tips', 'sets', 'reps', 'iso_hold', 'max',
        'order_in_workout')


class WorkoutSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True)

    class Meta:
        model = Workout
        fields = ('id', 'title', 'areas', 'workout_type', 'exercises', 'workout_cal_logs')
