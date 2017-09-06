INSERT INTO
  albums (title, artist)
VALUES
  ('Malibu', 'Anderson .Paak'),
  ('A Seat at the Table', 'Solange Knowles'),
  ('Melodrama', 'Lorde'),
  ('In Rainbows', 'Radiohead')
;

INSERT INTO
  users (name, email, password)
VALUES
  ('Arya Stark', 'NoOne@ravens.com', 'needle'),
  ('Jon Snow', 'KingOfTheNorth@ravens.com', 'ghost'),
  ('Daenerys Targaryen', 'Khaleesi@ravens.com', 'dragons')
  ;

  INSERT INTO
  reviews (content, user_id, album_id)
VALUES
  ('I liked it, good album.', 1, 1),
  ('It was ok', 1, 2),
  ('Reminds me of my youth.', 1, 3),
  ('It was terrible. ''nuff said.', 2, 1)
  ;
