<?php

namespace App\Jobs;

use App\Models\Log;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;

class LogRequest implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private string $method,
        private string $url
    ) {
        //
    }

    public function handle(): void
    {
        try {
            DB::beginTransaction();
            Log::create([
                'type' => 'request',
                'data' => json_encode([
                    'method' => $this->method,
                    'url' => $this->url,
                ]),
            ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger(json_encode($th->getMessage()));
            $this->fail($th->getMessage());
        }
    }
}
