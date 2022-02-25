# Generated by Django 4.0.1 on 2022-02-24 17:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0005_alter_log_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='log',
            old_name='exercise_id',
            new_name='exercise',
        ),
        migrations.CreateModel(
            name='WorkoutCalendarLog',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('date', models.DateField(auto_now_add=True, verbose_name='date completed')),
                ('workout', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workout', to='workouts.workout')),
            ],
        ),
        migrations.AddField(
            model_name='log',
            name='workout_calendar_log_id',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='logs', to='workouts.workoutcalendarlog'),
            preserve_default=False,
        ),
    ]