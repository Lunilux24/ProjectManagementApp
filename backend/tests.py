from django.test import TestCase
import unittest
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
import django
django.setup()

class TestProjectViews(TestCase):

    def test_project_list_requires_authentication(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, 401)  # Unauthorized

    def test_project_detail_requires_authentication(self):
        response = self.client.get('/api/projects/1/')
        self.assertEqual(response.status_code, 401)  # Unauthorized

    def test_project_list_with_authentication(self):
        response = self.client.post('/api/token/', {'username': 'user', 'password': 'pass'})
        self.assertContains(response, 'access')
        self.assertContains(response, 'refresh')
        
if __name__ == '__main__':
    unittest.main()
