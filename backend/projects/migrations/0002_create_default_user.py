from django.db import migrations


def create_default_user(apps, schema_editor):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    if not User.objects.filter(username='user').exists():
        User.objects.create_user('user', password='pass')


def remove_default_user(apps, schema_editor):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    User.objects.filter(username='user').delete()


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_default_user, reverse_code=remove_default_user),
    ]
