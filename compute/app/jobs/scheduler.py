from apscheduler.schedulers.asyncio import AsyncIOScheduler

scheduler = AsyncIOScheduler()


def start_scheduler(app):
    """Register periodic jobs. Wave 1: wired but no heavy job registered yet."""
    if not scheduler.running:
        scheduler.start()
    return scheduler
