from django.contrib import admin

from .models import Exercise, Workout, Log


class LogInLine(admin.TabularInline):
    model = Log
    extra = 3


class LogAdmin(admin.ModelAdmin):
    list_display = ('date', 'id',
                    'exercise_id',
                    'sets',
                    'reps',
                    'max',
                    )
    list_filter = ['date']
    search_fields = ['date', 'exercise_id']
    fieldsets = [
        (None, {'fields': ['id','exercise_id',
                    'sets',
                    'reps',
                    'max',]}),
        ('Date information', {'fields': ['date'], 'classes': ['collapse']}),
    ]
    readonly_fields = ['date','id',
                    'exercise_id',
                    'sets',
                    'reps',
                    'max',]


class ExerciseInline(admin.TabularInline):
    model = Exercise
    extra = 3
    inlines = [LogInLine]


class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('title', 'id',
                    'workout',

                    'area',
                    'tips',
                    'sets',
                    'reps',
                    'iso_hold',
                    'max',
                    'order_in_workout',)
    list_filter = ['workout']
    search_fields = ['title', 'area']

    inlines = [LogInLine]


class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('title', 'areas', 'workout_type')
    list_filter = ['workout_type']
    search_fields = ['workout_type', 'areas']
    fieldsets = [
        (None, {'fields': ['title', 'areas', 'workout_type']}),
    ]
    inlines = [ExerciseInline]


admin.site.register(Workout, WorkoutAdmin)
admin.site.register(Exercise, ExerciseAdmin)
admin.site.register(Log, LogAdmin)
