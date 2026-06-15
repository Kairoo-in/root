from app.jobs.backfill import content_hash


def test_content_hash_is_stable_and_distinct():
    assert content_hash("abc") == content_hash("abc")
    assert content_hash("abc") != content_hash("abd")
    assert len(content_hash("abc")) == 64
