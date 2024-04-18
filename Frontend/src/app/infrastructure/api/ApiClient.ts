import { Injectable } from '@angular/core';
import { Result } from '../../domain/abstractions/Result';
import { TokenStorage } from '../localStorage/TokenStorage';
import { UserStore } from '../state/UserStore';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiClient {
  private baseUrl = environment.API_URL;

  constructor(private userStore: UserStore ) {}

  private getUrl(url: string): string {
    // Ensure there's no double concatenation if full URL is accidentally passed
    if (url.toLowerCase().startsWith('http')) {
      return url;
    }
    return `${this.baseUrl}${url.startsWith('/') ? url.slice(1) : url}`;
  }

  private async request<T>(url: string, options: RequestInit): Promise<Result<T>> {
    const fullUrl = this.getUrl(url); // Ensure URL is correctly formed here
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.userStore.token().value,
      ...options.headers,
    };

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers: defaultHeaders,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return Result.Failure(this.parseErrors(errorData));
      }

      const data: T = await response.json();
      return Result.Success(data);
    } catch (error) {
      return Result.Failure([{ code: 'NetworkError', description: 'A network error occurred on: ' + url}]);
    }
  }

  private parseErrors(errorResponse: any): { code: string; description: string }[] {
    if(errorResponse.errors.length < 1) return [{ code: 'NetworkError', description: 'A network error occurred.' }]
    return errorResponse.errors;
  }

  async get<T>(url: string, headers?: HeadersInit, params?: URLSearchParams): Promise<Result<T>> {
    const fullUrl = params ? `${this.getUrl(url)}?${params}` : this.getUrl(url);
    return this.request<T>(fullUrl, { method: 'GET', headers } );
  }

  async post<T>(url: string, body?: any, headers?: HeadersInit): Promise<Result<T>> {
    return this.request<T>(url, { method: 'POST', headers, body: JSON.stringify(body) });
  }

  async put<T>(url: string, body?: any, headers?: HeadersInit): Promise<Result<T>> {
    return this.request<T>(url, { method: 'PUT', headers, body: JSON.stringify(body) });
  }

  async delete<T>(url: string, headers?: HeadersInit): Promise<Result<T>> {
    return this.request<T>(url, { method: 'DELETE', headers });
  }

  async patch<T>(url: string, body?: any, headers?: HeadersInit): Promise<Result<T>> {
    return this.request<T>(url, { method: 'PATCH', headers, body: JSON.stringify(body) });
  }
}

function sleep (time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
