package org.example.library.parser.types;

import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.ParseContext;
import org.example.library.parser.FileType;
import org.example.library.parser.Parser;
import org.example.library.parser.dto.MusicMetadata;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.xml.sax.ContentHandler;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Component
public class Mp3Parser implements Parser {

    private static final String UNKNOWN_TAG = "Unknown";

    @Override
    public MusicMetadata parse(File file) {
        try(FileInputStream inputStream = new FileInputStream(file)) {
            Metadata metadata = readMetadata(inputStream);
            return convert(file, metadata);
        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage(), e);
        }
    }

    private Metadata readMetadata(FileInputStream inputStream) throws IOException, SAXException, TikaException {
        ContentHandler handler = new DefaultHandler();
        Metadata metadata = new Metadata();
        org.apache.tika.parser.Parser parser = new org.apache.tika.parser.mp3.Mp3Parser();
        ParseContext parseCtx = new ParseContext();
        parser.parse(inputStream, handler, metadata, parseCtx);
        return metadata;
    }

    private MusicMetadata convert(File file, Metadata metadata) {
        MusicMetadata musicMetadata = new MusicMetadata();
        musicMetadata.setPath(file.getAbsolutePath());
        musicMetadata.setTitle(nvl(metadata.get("dc:title"), file.getName()));
        musicMetadata.setAlbum(nvl(metadata.get("xmpDM:album"), UNKNOWN_TAG));
        musicMetadata.setArtist(nvl(metadata.get("xmpDM:artist"), UNKNOWN_TAG));
        musicMetadata.setGenre(nvl(metadata.get("xmpDM:genre"), UNKNOWN_TAG));
        musicMetadata.setTrackNumber(metadata.get("xmpDM:trackNumber"));
        musicMetadata.setDuration(Double.parseDouble(nvl(metadata.get("xmpDM:duration"), "0")));
        musicMetadata.setExtension(forType().name());
        return musicMetadata;
    }

    private String nvl(String s1, String s2) {
        return StringUtils.hasLength(s1) ? s1 : s2;
    }

    @Override
    public FileType forType() {
        return FileType.MP3;
    }
}
