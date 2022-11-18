package org.example.playlist;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
public class Playlist {

    @Id
    private String id;
    private String name;
    private List<PlaylistFileDetails> files;
}
