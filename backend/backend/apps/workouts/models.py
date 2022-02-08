from django.db import models

class Workout(models.Model):

    PUSH = 'PU'
    PULL = 'PL'
    LEGS = 'LG'

    WORKOUT_DAY_CHOICES = [
        (PUSH, 'Push'),
        (PULL, 'Pull'),
        (LEGS, 'Legs'),
    ]
    id = models.IntegerField(primary_key=True)
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
    id = models.IntegerField(primary_key=True)
    workout = models.ForeignKey(Workout, related_name="exercises", on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    area = models.CharField(max_length=120)
    tips = models.CharField(max_length=120)
    sets = models.IntegerField(default=4)
    reps = models.IntegerField(default=10)
    iso_hold = models.IntegerField(default=7)
    max = models.IntegerField(default=0)
    order_in_workout = models.IntegerField(default=0)

    def _str_(self):
        return self.title

