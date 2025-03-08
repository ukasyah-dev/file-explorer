TRUNCATE TABLE "items";

INSERT INTO "items"
  ("name", "type", "folder")
VALUES
  -- Root level folders
  ('Documents', 'folder', '/'),
  ('Music', 'folder', '/'),
  ('Downloads', 'folder', '/'),
  ('Photos', 'folder', '/'),
  ('Videos', 'folder', '/'),

  -- Subfolders inside Documents
  ('work', 'folder', '/Documents'),
  ('personal', 'folder', '/Documents'),
  ('finance', 'folder', '/Documents'),

  -- Nested subfolders inside work
  ('planning', 'folder', '/Documents/work'),
  ('reports', 'folder', '/Documents/work'),
  ('meetings', 'folder', '/Documents/work'),

  -- Files in Documents
  ('resume.pdf', 'file', '/Documents'),
  ('tax_report_2024.xlsx', 'file', '/Documents/finance'),
  ('budget-2024.xlsx', 'file', '/Documents/finance'),

  -- Files in work/planning
  ('project_plan.docx', 'file', '/Documents/work/planning'),
  ('timeline.xlsx', 'file', '/Documents/work/planning'),

  -- Files in work/reports
  ('annual_report_2023.pdf', 'file', '/Documents/work/reports'),
  ('Q1_performance.xlsx', 'file', '/Documents/work/reports'),

  -- Files in work/meetings
  ('team_meeting_notes.txt', 'file', '/Documents/work/meetings'),
  ('client_call_recording.mp3', 'file', '/Documents/work/meetings'),

  -- Personal folder files
  ('journal.txt', 'file', '/Documents/personal'),
  ('travel_plan.pdf', 'file', '/Documents/personal'),

  -- Downloads
  ('installer.exe', 'file', '/Downloads'),
  ('receipt.pdf', 'file', '/Downloads'),

  -- Photos with nested folders
  ('Vacations', 'folder', '/Photos'),
  ('Family', 'folder', '/Photos'),
  ('profile.jpg', 'file', '/Photos'),
  ('beach_trip.jpg', 'file', '/Photos/Vacations'),
  ('birthday_party.jpg', 'file', '/Photos/Family'),

  -- Videos
  ('trip_video.mp4', 'file', '/Videos'),
  ('birthday_clip.mp4', 'file', '/Videos'),

  -- Music
  ('favorite_song.mp3', 'file', '/Music'),
  ('playlist.m3u', 'file', '/Music');
