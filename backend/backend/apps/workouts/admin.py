from django.contrib import admin

from .models import Exercise, Workout


class ExerciseInline(admin.TabularInline):
    model = Exercise
    extra = 3


class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('title', 'areas', 'workout_type')
    list_filter = ['workout_type']
    search_fields = ['workout_type', 'areas']
    fieldsets = [
        (None,               {'fields': ['title', 'areas', 'workout_type']}),
    ]
    inlines = [ExerciseInline]

admin.site.register(Workout, WorkoutAdmin)