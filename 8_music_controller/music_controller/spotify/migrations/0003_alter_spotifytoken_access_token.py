# Generated by Django 4.1.1 on 2022-10-22 01:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0002_alter_spotifytoken_refresh_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='access_token',
            field=models.CharField(max_length=150, null=True),
        ),
    ]