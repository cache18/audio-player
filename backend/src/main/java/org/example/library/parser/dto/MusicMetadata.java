package org.example.library.parser.dto;

import lombok.Data;

@Data
public class MusicMetadata {

    private String path;
    private String title;
    private String extension;
    private String album;
    private String trackNumber;
    private String artist;
    private String genre;
    private double duration;
}
