# https://maxhalford.github.io/blog/flask-sse-no-deps/


def format_sse(data: any, event=None) -> str:
    msg = f"data: {data}\n\n"
    if event is not None:
        msg = f"event: {event}\n{msg}"
    return msg
