# Generated by Django 4.0.1 on 2022-02-15 22:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0002_alter_exercise_id_alter_exercise_workout_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='log',
            old_name='exercise',
            new_name='exercise_id',
        ),
    ]
