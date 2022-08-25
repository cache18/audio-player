package org.example.library.parser;

import java.io.File;
import java.util.Set;

public enum FileType {
    MP3, FLAC, WAV, EMPTY;

    private static final Set<String> EXTENSIONS = Set.of("mp3");//, "flac", "wav");

    public static FileType fromFile(String file) {
        String extension = file.substring(file.lastIndexOf(".") + 1).toLowerCase();
        return switch (extension) {
            case "mp3" -> MP3;
            case "flac" -> FLAC;
            case "wav" -> WAV;
            default -> EMPTY;
        };
    }

    public static boolean isSupported(File file) {
        return EXTENSIONS.stream().anyMatch(ext -> file.getName().endsWith(ext));
    }
}
