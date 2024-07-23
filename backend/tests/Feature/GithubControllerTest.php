<?php

use Illuminate\Support\Facades\Http;

test('Should return 200 when user exists', function () {
    $response = $this->get('/api/user/ewertonmotta');
    $response->assertStatus(200);
});

test('Should return 404 when user not exists, but return message', function () {
    $response = $this->get('/api/user/ewertonmota');
    $response->assertStatus(404);
    $response->assertJson(['message' => 'User not found']);
});

test('Should return 200 when user following exists', function () {
    $response = $this->get('/api/user/ewertonmotta/following');
    $response->assertStatus(200);
});

test('Should return 200 when user following not exists, but return message', function () {
    $response = $this->get('/api/user/php/following');
    $response->assertStatus(200);
    $response->assertJson(['message' => 'The user does not follow anyone']);
});
