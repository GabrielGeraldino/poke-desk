import { TestBed, inject } from '@angular/core/testing';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
	let service: ApiService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ApiService],
		});

		service = TestBed.inject(ApiService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should send a GET request', () => {
		const endpoint = 'example';
		const response = { data: 'example response' };

		service.get(endpoint).subscribe(data => {
			expect(data).toEqual(response);
		});

		const req = httpMock.expectOne(`${service['apiUrl']}${endpoint}`);
		expect(req.request.method).toBe('GET');
		req.flush(response);
	});

	it('should send a GET request with filters', () => {
		const endpoint = 'example';
		const filter = { param: 'value' };
		const response = { data: 'example response' };

		service.get(endpoint, filter).subscribe(data => {
			expect(data).toEqual(response);
		});

		const req = httpMock.expectOne(`${service['apiUrl']}${endpoint}?param=value`);
		expect(req.request.method).toBe('GET');
		req.flush(response);
	});

	it('should send a GET request for a file', () => {
		const endpoint = 'example';
		const response = new ArrayBuffer(8);

		service.getFile(endpoint).subscribe(data => {
			expect(data).toEqual(response);
		});

		const req = httpMock.expectOne(`${service['apiUrl']}${endpoint}`);
		expect(req.request.method).toBe('GET');
		expect(req.request.responseType).toBe('arraybuffer');
		req.flush(response);
	});

	it('should send a POST request', () => {
		const endpoint = 'example';
		const body = { data: 'example body' };
		const response = { data: 'example response' };

		service.post(endpoint, body).subscribe(data => {
			expect(data).toEqual(response);
		});

		const req = httpMock.expectOne(`${service['apiUrl']}${endpoint}`);
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toEqual(body);
		req.flush(response);
	});

	it('should send a PUT request', () => {
		const endpoint = 'example';
		const body = { data: 'example body' };
		const response = { data: 'example response' };

		service.put(endpoint, body).subscribe(data => {
			expect(data).toEqual(response);
		});

		const req = httpMock.expectOne(`${service['apiUrl']}${endpoint}`);
		expect(req.request.method).toBe('PUT');
		expect(req.request.body).toEqual(body);
		req.flush(response);
	});

	it('should send a DELETE request', () => {
		const endpoint = 'example';
		const response = { data: 'example response' };

		service.delete(endpoint).subscribe(data => {
			expect(data).toEqual(response);
		});

		const req = httpMock.expectOne(`${service['apiUrl']}${endpoint}`);
		expect(req.request.method).toBe('DELETE');
		req.flush(response);
	});

	it('should send a PATCH request', () => {
		const endpoint = 'example';
		const body = { data: 'example body' };
		const response = { data: 'example response' };

		spyOn<any>(service, 'apiUrl').and.returnValue(service['apiUrl']);

		service.patch(endpoint, body).subscribe(data => {
			expect(data).toEqual(response);
		});

		const req = httpMock.expectOne(`${service['apiUrl']}${endpoint}`);
		expect(req.request.method).toBe('PATCH');
		expect(req.request.body).toEqual(body);
		req.flush(response);
	});
});
