from django.contrib import admin
from django.db import models
from django.utils import timezone
import datetime

class Workout(models.Model):

    PUSH = 'PU'
    PULL = 'PL'
    LEGS = 'LG'

    WORKOUT_DAY_CHOICES = [
        (PUSH, 'Push'),
        (PULL, 'Pull'),
        (LEGS, 'Legs'),
    ]

    title = models.CharField(max_length=120)
    areas = models.CharField(max_length=120)
    workout_type = models.CharField(
        max_length=2,
        choices=WORKOUT_DAY_CHOICES,
        default=PUSH,
    )

    def _str_(self):
        return self.title


class Exercise(models.Model):

    workout = models.ForeignKey(Workout, related_name="exercises", on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    area = models.CharField(max_length=120)
    tips = models.TextField()
    sets = models.IntegerField(default=4)
    reps = models.IntegerField(default=10)
    iso_hold = models.IntegerField(default=7)
    max = models.IntegerField(default=0)
    order_in_workout = models.IntegerField(default=0)


    def _str_(self):
        return self.title


class WorkoutCalendarLog(models.Model):

    workout = models.ForeignKey(Workout, related_name="workout_cal_logs", on_delete=models.CASCADE)
    date = models.DateField('date completed', auto_now_add=True)
    def _str_(self):
        return self.date


#Create model with date and workout type and have legend on calendar that tells which is which, then get workout data by searching by date.

class Log(models.Model):

    exercise = models.ForeignKey(Exercise, related_name="logs", on_delete=models.CASCADE) #Logs not included with exercise data as standard
    workout_calendar_log_id = models.ForeignKey(WorkoutCalendarLog, related_name="logs",
                                    on_delete=models.CASCADE)
    sets = models.IntegerField(default=0)
    reps = models.IntegerField(default=0)
    max = models.IntegerField(default=0)
    date = models.DateTimeField('date completed', auto_now_add=True)

    @admin.display(
        boolean=True,
        ordering='pub_date',
        description='Published recently?',
    )
    def completed_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now

    def _str_(self):
        return self.title

