export interface ZoneTheme {
  fogColor:              string
  ambientLightColor:     string
  ambientLightIntensity: number
  accentColor:           string
}

export interface ZoneEntry {
  id:               string
  label:            string
  entrancePosition: [number, number, number]
  triggerRadius:    number
  theme:            ZoneTheme
  contentIds:       string[]
}
