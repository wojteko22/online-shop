import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../-models/Product';
import {environment} from '../../environments/environment';
import {CredentialsService} from './credentials.service';

@Injectable()
export class ProductService {

  private productEndpoint = environment.apiUrl + '/products';

  private get ownerUrl() {
    const shopId = this.auth.getShopId();
    return ProductService.url(shopId);
  }

  private static url(shopId: number) {
    return `${environment.apiUrl}/shops/${shopId}/products`;
  }

  constructor(private http: HttpClient, private auth: CredentialsService) {
  }

  addProduct(product: Product) {
    return this.http.post(this.ownerUrl, product);
  }

  editProduct(id: number, product: Product) {
    return this.http.patch(this.ownerUrl + '/' + id, product);
  }

  getShopProducts(shopId: number) {
    const url = ProductService.url(shopId);
    return this.http.get<Product[]>(url);
  }

  getProduct(productId: Number) {
    return this.http.get<Product>(this.ownerUrl + '/' + productId);
  }

  getCategoryProducts(categoryId: number, shopId: number) {
    const url = ProductService.url(shopId);
    return this.http.get<Product[]>(url + '/category/' + categoryId);
  }

  getProductsLike(shopId: number, pattern: string) {
    return this.http.get<Product[]>(this.productEndpoint + '/shop/' + shopId + '/pattern/' + pattern);
  }
}
