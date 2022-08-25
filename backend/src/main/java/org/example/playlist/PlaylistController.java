package org.example.playlist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/playlists")
public class PlaylistController {

    private final PlaylistService service;

    @Autowired
    public PlaylistController(PlaylistService service) {
        this.service = service;
    }

    @GetMapping
    public List<Playlist> getPlaylists() {
        return service.getPlaylists();
    }

    @PostMapping
    public void createNewPlaylist(@RequestBody Playlist playlist) {
        service.createNewPlaylist(playlist);
    }

    @DeleteMapping("{id}")
    public void deletePlaylist(@PathVariable String id) {
        service.deletePlaylist(id);
    }
}
