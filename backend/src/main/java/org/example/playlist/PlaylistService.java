package org.example.playlist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class PlaylistService {

    private final PlaylistRepository repository;

    @Autowired
    public PlaylistService(PlaylistRepository repository) {
        this.repository = repository;
    }

    public List<Playlist> getPlaylists() {
        Iterator<Playlist> iterator = repository.findAll().iterator();
        List<Playlist> result = new ArrayList<>();
        while(iterator.hasNext()) {
            result.add(iterator.next());
        }
        return result;
    }

    public void createNewPlaylist(Playlist playlist) {
        repository.save(playlist);
    }

    public void deletePlaylist(String id) {
        repository.deleteById(id);
    }
}
