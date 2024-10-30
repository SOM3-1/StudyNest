export type LocationName =
  | 'The Commons'
  | 'University Center'
  | 'Library'
  | 'Science Hall'
  | 'Nedderman Hall'
  | 'College Park Center'
  | 'Arlington Hall'
  | 'Kalpana Chawla Hall'
  | 'Vandergriff Hall'
  | 'Arbor Oaks Club house'
  | 'Timber Brook Apartments'
  | 'The Lofts'
  | 'The Arlie Apartments'
  | 'Teams Online Meeting';

export type Coordinates = string;

export const UTA_LOCATIONS_MAP_COORDINATES: Record<LocationName, Coordinates> = {
  'The Commons': '32.73284566971979, -97.11702057122235',
  'University Center': '32.73191765370795, -97.11148670774112',
  'Library': '32.72985390875142, -97.11274788665084',
  'Science Hall': '32.730347991759515, -97.11384607814026',
  'Nedderman Hall': '32.73236609443646, -97.11409446651781',
  'College Park Center': '32.730698904977125, -97.10803209950976',
  'Arlington Hall': '32.7312751619795, -97.10937587383667',
  'Kalpana Chawla Hall': '32.728636656930796, -97.10969567633573',
  'Vandergriff Hall': '32.731580077686054, -97.10857175500068',
  'Arbor Oaks Club house': '32.73029695370713, -97.12095520073248',
  'Timber Brook Apartments': '32.73347921078461, -97.11953293197865',
  'The Lofts': '32.73255185256736, -97.1074411108443',
  'The Arlie Apartments': '32.736211815013554, -97.11772838393442',
  'Teams Online Meeting': '',
};
