export type MappedObjectType = {
  [key: string]: any;
};

export type LinkType = {
  type: 'link' | 'button';
  label: string;
  url: string;
  fullReload?: boolean;
};

export type AlertType = {
  type: null | '' | 'ACTION' | 'INFORMATION' | 'SUCCESS' | 'WARNING' | 'ERROR';
  title?: string;
  message?: string;
  setFocus?: boolean;
};

export type NotificationValueType = null | 'dot' | 'new' | number;


// Date's custom types.
/**
 * Represent a string like `2021-01-08`
 */
type DateISODateType = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

/**
 * Represent a string like `14:42:34.678`
 */
type DateISOTimeType = `${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}`;

/**
 * Represent a string like `2021-01-08T14:42:34.678Z` (format: ISO 8601).
 */
export type DateISOType = `${DateISODateType}T${DateISOTimeType}Z`;
