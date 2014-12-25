def filter_assignor(value):
    pattern = {'reel_frame': '', 'assignor': []}
    m = []
    d = {}
    for key in value:
        if not d.has_key(key['patent_id'] + key['reel_frame']):
            d[key['patent_id'] + key['reel_frame']] = True
            pattern['reel_frame'] = key['reel_frame']
            pattern['assignor'].append((key['name'],key['exec_time']))
            m.append(pattern.copy())
            pattern['assignor'] = []
        else:
            m[len(m) - 1]['assignor'].append((key['name'], key['exec_time']))
    m.sort(key=lambda k: k['reel_frame'])
    return m

