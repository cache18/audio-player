package org.example.playlist;

import lombok.Data;

@Data
public class PlaylistFileDetails {
    private String path;
    private String title;
    private String extension;
    private String album;
    private String trackNumber;
    private String artist;
    private String genre;
    private Double duration;
}
