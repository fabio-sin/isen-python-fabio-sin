from products.models import Product
from django.urls import reverse
from django.test import Client
from pytest_django.asserts import assertTemplateUsed
import pytest

from home.views import RedirectHomeView, HomeView


def test_RedirectHomeView():
    client = Client()
    response = client.get(reverse('redirect_home'))

    """ 
    Testing if our RedirectHomeView redirects succuessfully (status_code 302)
    For the second assert, We are testing if we redirect to the '/home/' url
     """

    assert response.status_code == 302
    assert response.url == '/home/'


@pytest.mark.django_db
def test_HomeView():
    client = Client()
    response = client.get(reverse('home'))

    """ 
    In the first assert, We are testing if our get request returns 200 (OK) status code 
    For the second assert, we are making sure that our view returns the home.html template
    """

    assert response.status_code == 200
    assertTemplateUsed(response, 'home.html')

# Tests unitaires pour la feature min/max price


@pytest.mark.django_db
def test_price_filter_min_price():
    Product.objects.create(name="Product A", price=10.00,
                           description="Test A", image="img.png")
    Product.objects.create(name="Product B", price=30.00,
                           description="Test B", image="img.png")
    Product.objects.create(name="Product C", price=50.00,
                           description="Test C", image="img.png")

    client = Client()
    response = client.get(reverse('home'), {'min_price': 20})
    content = response.content.decode()

    assert "Product A" not in content
    assert "Product B" in content
    assert "Product C" in content


@pytest.mark.django_db
def test_price_filter_max_price():
    Product.objects.create(name="Product A", price=10.00,
                           description="Test A", image="img.png")
    Product.objects.create(name="Product B", price=30.00,
                           description="Test B", image="img.png")
    Product.objects.create(name="Product C", price=50.00,
                           description="Test C", image="img.png")

    client = Client()
    response = client.get(reverse('home'), {'max_price': 20})
    content = response.content.decode()

    assert "Product A" in content
    assert "Product B" not in content
    assert "Product C" not in content


@pytest.mark.django_db
def test_price_filter_min_and_max_price():
    Product.objects.create(name="Product A", price=10.00,
                           description="Test A", image="img.png")
    Product.objects.create(name="Product B", price=30.00,
                           description="Test B", image="img.png")
    Product.objects.create(name="Product C", price=50.00,
                           description="Test C", image="img.png")

    client = Client()
    response = client.get(reverse('home'), {'min_price': 20, 'max_price': 40})
    content = response.content.decode()

    assert "Product A" not in content
    assert "Product B" in content
    assert "Product C" not in content
