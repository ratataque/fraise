# Generated by Django 4.1.3 on 2022-12-04 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_users_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='is_active',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]
