package org.example.library.parser;

import org.example.library.parser.dto.MusicMetadata;

import java.io.File;

public interface Parser {

    MusicMetadata parse(File file);

    FileType forType();
}
