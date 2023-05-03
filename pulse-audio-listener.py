import pulsectl
import datetime

prev = ''
last = datetime.datetime.now()


with pulsectl.Pulse('log-events') as pulse:
  def send_signal(ev):
    global prev, last
    if ev.t == 'change' and ev.facility == 'sink_input':
      if prev != str(ev) or (datetime.datetime.now() - last).total_seconds() > 1:
        prev = str(ev)
        last = datetime.datetime.now()
        print('Pulse event:', ev, flush=True)

  pulse.event_mask_set('all')
  pulse.event_callback_set(send_signal)
  pulse.event_listen(timeout=0)
