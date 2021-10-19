package com.example.demo.services;

import com.example.demo.persistence.entities.Client;
import com.example.demo.persistence.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements EntityService<Client>{

    @Autowired
    ClientRepository clientRepository;

    @Override
    public Client saveEntity(Client entity) {
        boolean cumple = entity.getPassword().length() <=45 && entity.getEmail().length()<=45&&
                entity.getAge()<=130 && entity.getAge()>=0 && entity.getName().length()<=250;
        if(cumple){
            return clientRepository.save(entity);
        }
        return new Client(null, null,null,null);
    }

    @Override
    public List<Client> getEntity() {
        return clientRepository.findAll();
    }

    @Override
    public Client updateEntity(Client entity) {
        boolean comply = entity.getPassword().length() <= 45 && entity.getName().length()<=250 && entity.getAge() <= 10000;
        Client client = clientRepository.findById(entity.getIdClient()).orElse(new Client("Not updated"));
        if(comply && !client.getName().equals("Not updated")){
            client.setName(entity.getName());
            client.setAge(entity.getAge());
            client.setPassword(entity.getPassword());
            clientRepository.save(client);
        }
        return client;
    }

    @Override
    public Client deleteEntity(Integer id) {
        Client client  = clientRepository.findById(id).orElse(new Client("Not deleted"));
        if (!client.getName().equals("Not deleted")){
            clientRepository.deleteById(id);
        }
        return client;
    }
}
