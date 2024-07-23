<?php

namespace App\Jobs;

use App\Models\Log;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;

class LogResponse implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private array $data
    ) {
        //
    }

    public function handle(): void
    {
        try {
            DB::beginTransaction();
            Log::create([
                'type' => 'response',
                'data' => json_encode($this->data),
            ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            logger(json_encode($th->getMessage()));
            $this->fail($th->getMessage());
        }
    }
}
